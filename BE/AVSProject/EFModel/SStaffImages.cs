using System;
using System.Collections.Generic;

namespace AVSProject.EFModel
{
    public partial class SStaffImages
    {
        public int StaffId { get; set; }
        public byte[] Image { get; set; }
        public byte[] ImageSmall { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
