using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.Business
{
    public class StaffBusiness
    {
        private static StaffService staffService = new StaffService();
        private static db_AVSContext dataModel = new db_AVSContext();

        public List<StaffModel> GetStaff()
        {
            List<StaffModel> listData = new List<StaffModel>();
            var getAllStaff = staffService.GetAllStaff();
            listData = getAllStaff.Select(x => new StaffModel()
            {
                StaffID = x.StaffId,
                BranchId = x.BranchId,
                StaffName = x.StaffName,
                StaffCode = x.StaffCode,
                Gender = x.Gender,
                PhoneNumber1 = x.PhoneNumber1,
                PhoneNumber2 = x.PhoneNumber1,
                DateOfBirth = x.DateOfBirth.HasValue ? x.DateOfBirth.Value : DateTime.Now,
                isVN = x.IsVn.HasValue ? x.IsVn.Value : false,
                IDCard = x.Idcard,
                isInActive = x.IsInactive.HasValue ? x.IsInactive.Value : false,
                CreateAt = x.CreatedAt.HasValue ? x.CreatedAt.Value : DateTime.Now,
                CreateBy = x.CreatedBy.HasValue ? x.CreatedBy.Value : 0,
                ModifiedAt = x.ModifiedAt.HasValue ? x.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = x.ModifiedBy.HasValue ? x.ModifiedBy.Value : 0,
                Descriptions = x.Decriptions
            }).ToList();
            return listData;
        }

        public StaffModel GetStaffByID(int StaffID)
        {
            StaffModel data = new StaffModel();
            var getStaff = staffService.Get(StaffID);
            if (getStaff == null) return new StaffModel();
            data = new StaffModel
            {
                StaffID = getStaff.StaffId,
                BranchId = getStaff.BranchId,
                StaffName = getStaff.StaffName,
                StaffCode = getStaff.StaffCode,
                Gender = getStaff.Gender,
                PhoneNumber1 = getStaff.PhoneNumber1,
                PhoneNumber2 = getStaff.PhoneNumber1,
                DateOfBirth = getStaff.DateOfBirth.HasValue ? getStaff.DateOfBirth.Value : DateTime.Now,
                isVN = getStaff.IsVn.HasValue ? getStaff.IsVn.Value : false,
                IDCard = getStaff.Idcard,
                isInActive = getStaff.IsInactive.HasValue ? getStaff.IsInactive.Value : false,
                CreateAt = getStaff.CreatedAt.HasValue ? getStaff.CreatedAt.Value : DateTime.Now,
                CreateBy = getStaff.CreatedBy.HasValue ? getStaff.CreatedBy.Value : 0,
                ModifiedAt = getStaff.ModifiedAt.HasValue ? getStaff.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = getStaff.ModifiedBy.HasValue ? getStaff.ModifiedBy.Value : 0,
                Descriptions = getStaff.Decriptions
            };
            return data;
        }

        public void UpdateStaff(StaffModel Staff)
        {
            var check = staffService.Get(Staff.StaffID);
            var data = new SStaff
            {
                StaffId = check.StaffId,
                BranchId = check.BranchId,
                StaffName = check.StaffName,
                StaffCode = check.StaffCode,
                Gender = check.Gender,
                PhoneNumber1 = check.PhoneNumber1,
                PhoneNumber2 = check.PhoneNumber1,
                DateOfBirth = check.DateOfBirth.Value,
                IsVn = check.IsVn.HasValue ? check.IsVn.Value : false,
                Idcard = check.Idcard,
                IsInactive = check.IsInactive.HasValue ? check.IsInactive.Value : false,
                CreatedAt = check.CreatedAt.HasValue ? check.CreatedAt.Value : DateTime.Now,
                CreatedBy = check.CreatedBy.HasValue ? check.CreatedBy.Value : 0,
                ModifiedAt = check.ModifiedAt.HasValue ? check.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = check.ModifiedBy.HasValue ? check.ModifiedBy.Value : 0,
                Decriptions = check.Decriptions
            };
            if (check == null)
            {
                staffService.Add(data);
                return;
            }
            else
            {
                staffService.Update(data);
                return;
            }
        }
        public void DeleteStaff(int StaffID)
        {
            staffService.Delete(StaffID);
        }
    }
}
