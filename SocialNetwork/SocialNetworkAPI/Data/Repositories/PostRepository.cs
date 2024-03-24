using Data.Context;
using Data.Models;
using Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
	public class PostRepository(AppDbContext _context) : Repository<Post>(_context), IPostRepository
	{

	}
}
