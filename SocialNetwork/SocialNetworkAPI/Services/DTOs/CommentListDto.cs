using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class CommentListDto:IDTO
	{
		public ICollection<CommentDto> CommentsList { get; set; }
	}
}
