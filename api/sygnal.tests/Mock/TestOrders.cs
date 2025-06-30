using sygnal.Entities;
using sygnal.Enums;

namespace sygnal.tests.Mock
{
    public static class TestOrders
    {
        public static List<Order> Orders =
        [
            new Order { Id = 1, Name = "ORD-TEST-001", State = StateEnum.Pending, CreatedAt = DateTime.UtcNow, UpdatedAt = null },
            new Order { Id = 2, Name = "ORD-TEST-002", State = StateEnum.Completed, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Order { Id = 3, Name = "ORD-TEST-003", State = StateEnum.Pending, CreatedAt = DateTime.UtcNow, UpdatedAt = null },
            new Order { Id = 4, Name = "ORD-TEST-004", State = StateEnum.Completed, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Order { Id = 5, Name = "ORD-TEST-005", State = StateEnum.InProgress, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        ];
    }
}