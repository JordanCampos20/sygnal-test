namespace sygnal.Interfaces.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>?> GetAllAsync();
    Task<T?> GetByIdAsync(params object[] keyValues);
    Task AddAsync(T entity);
    Task AddRangeAsync(T[] entities);
    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(T[] entities);
    Task DeleteAsync(T entity);
    Task DeleteRangeAsync(T[] entities);
}