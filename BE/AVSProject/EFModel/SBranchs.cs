using System;
using System.Collections.Generic;

namespace AVSProject.model
{
    public partial class SBranchs
    {
        public int BranchId { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string Address { get; set; }
        public bool IsHead { get; set; }
        public int Status { get; set; }
        public int? CountMember { get; set; }
        public int? CountStudent { get; set; }
        public string Manager { get; set; }
        public DateTime? ActiveDate { get; set; }
        public DateTime? InActiveDate { get; set; }
        public string Decriptions { get; set; }
        public bool? IsInactive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
