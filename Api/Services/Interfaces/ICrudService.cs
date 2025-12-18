namespace Api.Services.Interfaces;

public interface ICrudService<T, DTO>
{
    public Task<T> FindByIdAsync(Guid id);
    public Task<IEnumerable<T>> FindAllAsync();
    public Task<T> SaveAsync(DTO dto);
    public Task<T> UpdateAsync(DTO dto, Guid id);
    public Task DeleteAsync(Guid id);
}