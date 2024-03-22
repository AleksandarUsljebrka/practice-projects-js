
using System.Linq.Expressions;

namespace Data.Repositories.Interfaces
{
	public interface IRepository<T> where T : class
	{
		IEnumerable<T> GetAll();
		IEnumerable<T> FindAll();
		T Get(Expression<Func<T, bool>> predicate);
		void Add(T entity);
		void Remove(T entity);

	}
}
