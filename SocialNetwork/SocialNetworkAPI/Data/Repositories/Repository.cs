using Data.Context;
using Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repositories
{
	public class Repository<T> : IRepository<T> where T : class
	{
		protected readonly AppDbContext _context;
		internal DbSet<T> dbSet;
		public Repository(AppDbContext context)
		{
			_context = context;
			dbSet = _context.Set<T>();
		}
		public void Add(T entity)
		{
			dbSet.Add(entity);
		}

		public IEnumerable<T> FindAll()
		{
			throw new NotImplementedException();
		}

		public T Get(Expression<Func<T, bool>> filter)
		{
			return dbSet.Where(filter).FirstOrDefault();
		}

		public IEnumerable<T> GetAll()
		{
			return dbSet.ToList();
		}

		public void Remove(T entity)
		{
			dbSet.Remove(entity);
		}

		public void Update(T entity)
		{
			dbSet.Update(entity);
		}
	}
}
