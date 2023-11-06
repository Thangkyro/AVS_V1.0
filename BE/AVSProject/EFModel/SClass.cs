using System;
using System.Collections.Generic;

namespace AVSProject.EFModel
{
    public partial class SClass
    {
        public int ClassId { get; set; }
        public int BranchId { get; set; }
        public string ClassCode { get; set; }
        public string ClassName { get; set; }
        public string Level { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Decriptions { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
