using System;
using System.Collections.Generic;

namespace AVSProject.EFModel
{
    public partial class SSchedule
    {
        public int ScheduleId { get; set; }
        public int BranchId { get; set; }
        public string ScheduleName { get; set; }
        public int? StaffId { get; set; }
        public int? ClassId { get; set; }
        public string Decriptions { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
