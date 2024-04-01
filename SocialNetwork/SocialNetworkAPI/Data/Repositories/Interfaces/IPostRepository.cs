using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Interfaces
{
	public interface IPostRepository:IRepository<Post>
	{
		IEnumerable<Post> GetAllIncludeUsersAndComments();
		Task<int> AddPost(Post post);
		Task<int> DeletePost(Post post);
	}
}
