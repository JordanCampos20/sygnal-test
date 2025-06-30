using sygnal.Interfaces.Repositories;
using sygnal.Entities;
using sygnal.Services;
using Moq;
using sygnal.Enums;
using sygnal.tests.Mock;

namespace sygnal.tests.Tests.Unit
{
    public class OrderServiceTest
    {
        [Fact]
        public async Task GetOrderAll_ReturnsOrder()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetAllAsync().Result)
            .Returns(TestOrders.Orders);

            var service = new OrderService(mockRepo.Object);

            var orders = await service.GetAllAsync();

            Assert.NotNull(orders);

            var order = orders.FirstOrDefault();

            Assert.NotNull(order);
            Assert.Equal(1, order.Id);
            Assert.Equal("ORD-TEST-001", order.Name);
            Assert.Equal(StateEnum.Pending, order.State);
        }

        [Fact]
        public async Task GetOrderById_ReturnsOrder()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1).Result)
            .Returns(TestOrders.Orders.FirstOrDefault());

            var service = new OrderService(mockRepo.Object);

            var order = await service.GetByIdAsync(1);

            Assert.NotNull(order);
            Assert.Equal(1, order.Id);
            Assert.Equal("ORD-TEST-001", order.Name);
            Assert.Equal(StateEnum.Pending, order.State);
        }

        [Fact]
        public async Task GetOrderById_WhenOrderNotFound_ReturnsNull()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Order?)null);

            var service = new OrderService(mockRepo.Object);

            var result = await service.GetByIdAsync(999);

            Assert.Null(result);
        }

        [Fact]
        public async Task AddOrder_ReturnsOrder()
        {
            var testOrders = new List<Order>(TestOrders.Orders);

            var newOrder = new Order()
            {
                Id = 6,
                Name = "ORD-TEST-006",
                State = StateEnum.Pending
            };

            testOrders.Add(newOrder);

            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetAllAsync().Result)
                .Returns(testOrders);

            mockRepo.Setup(r => r.AddAsync(newOrder))
                .Returns(Task.CompletedTask);

            var service = new OrderService(mockRepo.Object);

            var orders = await service.GetAllAsync();

            Assert.NotNull(orders);

            var order = orders.LastOrDefault();

            Assert.NotNull(order);
            Assert.Equal(6, order.Id);
            Assert.Equal("ORD-TEST-006", order.Name);
            Assert.Equal(StateEnum.Pending, order.State);
        }

        [Fact]
        public async Task UpdateOrder_ReturnsOrder()
        {
            var updateOrder = TestOrders.Orders.FirstOrDefault(item => item.Id == 5);

            Assert.NotNull(updateOrder);

            updateOrder.State = StateEnum.Completed;
            updateOrder.UpdatedAt = DateTime.UtcNow;

            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(5).Result)
                .Returns(updateOrder);

            mockRepo.Setup(r => r.UpdateAsync(updateOrder))
                .Returns(Task.CompletedTask);

            var service = new OrderService(mockRepo.Object);

            var order = await service.GetByIdAsync(5);

            Assert.NotNull(order);
            Assert.Equal(5, order.Id);
            Assert.Equal("ORD-TEST-005", order.Name);
            Assert.Equal(StateEnum.Completed, order.State);
        }
    }
}
