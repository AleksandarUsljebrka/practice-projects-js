using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class PostDto:IDTO
	{
		public int Id { get; set; }
		public string Content { get; set; }
		public int Likes { get; set; }
		public string UserId { get; set; }
	}
}
