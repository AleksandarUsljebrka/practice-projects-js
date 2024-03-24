using Data.Context;
using Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
	public class UnitOfWork: IUnitOfWork
	{
		private AppDbContext _context;
        public UnitOfWork(AppDbContext context)
        {
			_context = context;
			UserRepository = new UserRepository(_context);
			PostRepository = new PostRepository(_context);
            
        }
        public IUserRepository UserRepository { get; set ; }
		public IPostRepository PostRepository { get; set ; }
		public void SaveChanges()
		{
			_context.SaveChanges();
		}
	}
}
