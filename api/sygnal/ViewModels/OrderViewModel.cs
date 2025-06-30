using sygnal.Entities;
using sygnal.Enums;

namespace sygnal.ViewModels;

public class OrderViewModel
{
    public OrderViewModel()
    {
        
    }

    public OrderViewModel(Order order)
    {
        Id = order.Id;
        State = order.State;
        CreatedAt = order.CreatedAt;
        UpdatedAt = order.UpdatedAt;
    }

    public int Id { get; set; }
    public StateEnum State { get; set; }
    public string StateName
    {
        get
        {
            return State switch
            {
                StateEnum.Pending => "Pending",
                StateEnum.InProgress => "In Progress",
                StateEnum.Completed => "Completed",
                _ => string.Empty,
            };
        }
    }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}