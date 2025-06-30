using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using sygnal.Enums;
using sygnal.ViewModels;

namespace sygnal.tests.Tests.Integration
{
    public class OrderControllerTest(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client = factory.CreateClient();
        private readonly JsonSerializerOptions _serializerOptions = new()
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    ReferenceHandler = ReferenceHandler.IgnoreCycles,
                    PropertyNameCaseInsensitive = true
                };
        [Fact]
        public async Task GetOrders_ReturnsSuccessAndOrder()
        {
            var response = await _client.GetAsync("/api/v1/order");

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var json = JsonSerializer.Deserialize<List<OrderViewModel>>(content, options: _serializerOptions);

            Assert.NotNull(json);

            var firstOrder = json.FirstOrDefault();

            Assert.NotNull(firstOrder);
            Assert.Equal(1, firstOrder.Id);
            Assert.Equal(StateEnum.Pending, firstOrder.State);
        }

        [Fact]
        public async Task GetOrder_ReturnsSuccessAndOrder()
        {
            var response = await _client.GetAsync("/api/v1/order/2");

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var json = JsonSerializer.Deserialize<OrderViewModel>(content, _serializerOptions);

            Assert.NotNull(json);
            Assert.Equal(2, json.Id);
            Assert.Equal(StateEnum.Completed, json.State);
        }

        [Fact]
        public async Task GetOrder_WhenOrderDoesNotExist_ReturnsNotFound()
        {
            var response = await _client.GetAsync("/api/v1/order/999");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task PostOrder_ReturnsSuccessAndOrder()
        {
            var response = await _client.PostAsync("/api/v1/order", null);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var json = JsonSerializer.Deserialize<OrderViewModel>(content, _serializerOptions);

            Assert.NotNull(json);
            Assert.Equal(6, json.Id);
            Assert.Equal(StateEnum.Pending, json.State);
        }

        [Fact]
        public async Task PatchOrder_ReturnsSuccessAndOrder()
        {
            var response = await _client.PatchAsync("/api/v1/order/3", null);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var json = JsonSerializer.Deserialize<OrderViewModel>(content, _serializerOptions);

            Assert.NotNull(json);
            Assert.Equal(3, json.Id);
            Assert.Equal(StateEnum.InProgress, json.State);
        }

        [Fact]
        public async Task PatchOrder_WhenOrderDoesNotExist_ReturnsNotFound()
        {
            var response = await _client.PatchAsync("/api/v1/order/999", null);

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
