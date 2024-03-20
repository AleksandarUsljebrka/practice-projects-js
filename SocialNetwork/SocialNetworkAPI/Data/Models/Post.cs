using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
	public class Post
	{
		public int Id { get; set; }
		public string? Content {  get; set; }
		public int? Likes { get; set; }
		public User? User { get; set; }
		public ICollection<Comment>? Comments { get; set; }

	}
}
