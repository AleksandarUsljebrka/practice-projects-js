using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Interfaces
{
	public interface ICommentRepository:IRepository<Comment>
	{
		IEnumerable<Comment> GetAllCommentsOfPost(Expression<Func<Comment, bool>> predicate);
		Task<Comment> AddComment(Comment comment);
	}
}
