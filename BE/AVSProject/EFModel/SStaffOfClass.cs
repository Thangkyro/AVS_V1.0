using System;
using System.Collections.Generic;

namespace AVSProject.EFModel
{
    public partial class SStaffOfClass
    {
        public int StaffOfClassId { get; set; }
        public int BranchId { get; set; }
        public string ClassId { get; set; }
        public string StaffId { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
