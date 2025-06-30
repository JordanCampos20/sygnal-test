using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sygnal.DTOs;
using sygnal.Entities;
using sygnal.Enums;
using sygnal.Interfaces.Services;
using sygnal.ViewModels;

namespace sygnal.Controllers;

[ApiController]
[Route("api/v{version:version}/[controller]")]
[Tags("Order")]
[ApiVersion(1)]
[AllowAnonymous]
public class OrderController(IOrderService orderService) : ControllerBase
{
    private readonly IOrderService _orderService = orderService;

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        IEnumerable<Order>? orders = await _orderService.GetAllAsync();

        if (orders == null)
        {
            return NotFound("Orders not found");
        }
        else if (!orders.Any())
        {
            return NoContent();
        }

        return Ok(orders.Select(order => new OrderViewModel(order)));
    }

    [HttpGet("{orderId}", Name = "GetOrder")]
    public async Task<IActionResult> GetByIdAsync(int orderId)
    {
        Order? order = await _orderService.GetByIdAsync(orderId);

        if (order == null)
        {
            return NotFound("Order not found");
        }

        return Ok(new OrderViewModel(order));
    }

    [HttpPost]
    public async Task<IActionResult> PostOrderAsync([FromBody] OrderDTO orderDTO)
    {
        Order order = new()
        {
            Name = orderDTO.Name,
            State = StateEnum.Pending,
            CreatedAt = DateTime.UtcNow
        };

        await _orderService.AddAsync(order);

        return CreatedAtRoute("GetOrder", new { orderId = order.Id }, new OrderViewModel(order));
    }

    [HttpPatch("{orderId}")]
    public async Task<IActionResult> PatchStateByIdAsync(int orderId)
    {
        Order? order = await _orderService.GetByIdAsync(orderId);

        if (order == null)
        {
            return NotFound("Order not found");
        }

        if (order.State != StateEnum.Completed)
        {
            order.UpdatedAt = DateTime.UtcNow;

            if (order.State == StateEnum.Pending)
                order.State = StateEnum.InProgress;
            else if (order.State == StateEnum.InProgress)
                order.State = StateEnum.Completed;

            await _orderService.UpdateAsync(order);
        }

        return CreatedAtRoute("GetOrder", new { orderId = order.Id }, new OrderViewModel(order));
    }
}