using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class CommentDto:IDTO
	{
		public string Content { get; set; }
		public int Id { get; set; }
	}
}
