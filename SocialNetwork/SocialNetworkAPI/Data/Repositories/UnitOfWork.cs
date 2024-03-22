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
            
        }
        public IUserRepository UserRepository { get; set ; }

		public void SaveChanges()
		{
			throw new NotImplementedException();
		}
	}
}
