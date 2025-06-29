using Microsoft.EntityFrameworkCore;
using sygnal.Context;
using sygnal.Entities;
using sygnal.Interfaces.Repositories;

namespace sygnal.Repositories;

public class OrderRepository(ApplicationDbContext context) : IOrderRepository
{
    private readonly ApplicationDbContext _context = context;
    
    public async Task<IEnumerable<Order>?> GetAllAsync()
    {
        return await _context.Orders.ToListAsync();
    }

    public async Task<Order?> GetByIdAsync(params object[] keyValues)
    {
        return await _context.Orders.FindAsync(keyValues);
    }

    public Task AddAsync(Order order)
    {
        _context.Orders.Add(order);

        return _context.SaveChangesAsync();
    }
    
    public Task AddRangeAsync(Order[] orders)
    {
        _context.Orders.AddRange(orders);

        return _context.SaveChangesAsync();
    }

    public Task UpdateAsync(Order order)
    {
        _context.Orders.Update(order);

        return _context.SaveChangesAsync();
    }
    
    public Task UpdateRangeAsync(Order[] orders)
    {
        _context.Orders.UpdateRange(orders);

        return _context.SaveChangesAsync();
    }

    public Task DeleteAsync(Order order)
    {
        _context.Orders.Remove(order);

        return _context.SaveChangesAsync();
    }
    
    public Task DeleteRangeAsync(Order[] orders)
    {
        _context.Orders.RemoveRange(orders);

        return _context.SaveChangesAsync();
    }
}