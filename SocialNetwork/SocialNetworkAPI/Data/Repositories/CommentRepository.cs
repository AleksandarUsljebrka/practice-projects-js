using Data.Context;
using Data.Models;
using Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
	public class CommentRepository(AppDbContext _context):Repository<Comment>(_context), ICommentRepository
	{
		public IEnumerable<Comment> GetAllCommentsOfPost(Expression<Func<Comment, bool>> predicate)
		{
			return _context.Set<Comment>().Where(predicate).ToList();
		}
		public async Task<Comment> AddComment(Comment comment)
		{
			_context.Set<Comment>().Add(comment);
			await _context.SaveChangesAsync();
			return comment;
		}
	}
}
