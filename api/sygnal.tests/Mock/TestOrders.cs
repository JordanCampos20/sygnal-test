using sygnal.Entities;
using sygnal.Enums;

namespace sygnal.tests.Mock
{
    public static class TestOrders
    {
        public static List<Order> Orders =
        [
            new Order { Id = 1, State = StateEnum.Pending, CreatedAt = DateTime.UtcNow, UpdatedAt = null },
            new Order { Id = 2, State = StateEnum.Completed, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Order { Id = 3, State = StateEnum.Pending, CreatedAt = DateTime.UtcNow, UpdatedAt = null },
            new Order { Id = 4, State = StateEnum.Completed, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Order { Id = 5, State = StateEnum.InProgress, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        ];
    }
}