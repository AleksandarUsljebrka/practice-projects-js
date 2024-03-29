using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Interfaces
{
	public interface IUnitOfWork
	{
		IUserRepository UserRepository { get; set; }
		IPostRepository PostRepository { get; set; }
		ICommentRepository CommentRepository { get; set; }


		void SaveChanges();
	}
}
