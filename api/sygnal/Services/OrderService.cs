using sygnal.Entities;
using sygnal.Interfaces.Repositories;
using sygnal.Interfaces.Services;

namespace sygnal.Services;

public class OrderService(IOrderRepository orderRepository) : IOrderService
{
    private readonly IOrderRepository _orderRepository = orderRepository;
    
    public async Task<IEnumerable<Order>?> GetAllAsync()
    {
        return await _orderRepository.GetAllAsync();
    }

    public async Task<Order?> GetByIdAsync(params object[] keyValues)
    {
        return await _orderRepository.GetByIdAsync(keyValues);
    }

    public Task AddAsync(Order order)
    {
        return _orderRepository.AddAsync(order);
    }
    
    public Task AddRangeAsync(Order[] orders)
    {
        return _orderRepository.AddRangeAsync(orders);
    }

    public Task UpdateAsync(Order order)
    {
        return _orderRepository.UpdateAsync(order);
    }
    
    public Task UpdateRangeAsync(Order[] orders)
    {
        return _orderRepository.UpdateRangeAsync(orders);
    }

    public Task DeleteAsync(Order order)
    {
        return _orderRepository.DeleteAsync(order);
    }
    
    public Task DeleteRangeAsync(Order[] orders)
    {
        return _orderRepository.DeleteRangeAsync(orders);
    }
}