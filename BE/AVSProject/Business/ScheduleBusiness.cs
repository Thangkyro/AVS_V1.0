using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.Business
{
    public class ScheduleBusiness
    {
        private static ScheduleService ScheduleService = new ScheduleService();
        private static db_AVSContext dataModel = new db_AVSContext();

        public List<ScheduleModel> GetSchedule()
        {
            List<ScheduleModel> listData = new List<ScheduleModel>();
            var getAllSchedule = ScheduleService.GetAllSchedule();
            listData = getAllSchedule.Select(x => new ScheduleModel()
            {
                ScheduleID = x.ScheduleId,
                ScheduleName = x.ScheduleName,
                BranchId = x.BranchId,
                ClassID = x.ClassId.HasValue ? x.ClassId.Value : 0,
                StaffID = x.StaffId.HasValue ? x.StaffId.Value : 0,
                isInActive = x.IsInactive.HasValue ? x.IsInactive.Value : false,
                CreateAt = x.CreatedAt.HasValue ? x.CreatedAt.Value : DateTime.Now,
                CreateBy = x.CreatedBy.HasValue ? x.CreatedBy.Value : 0,
                ModifiedAt = x.ModifiedAt.HasValue ? x.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = x.ModifiedBy.HasValue ? x.ModifiedBy.Value : 0,
                Descriptions = x.Decriptions,
            }).ToList();
            return listData;
        }

        public ScheduleModel GetScheduleByID(int ScheduleID)
        {
            ScheduleModel data = new ScheduleModel();
            var getSchedule = ScheduleService.Get(ScheduleID);
            if (getSchedule == null) return new ScheduleModel();
            data = new ScheduleModel
            {
                ScheduleID = getSchedule.ScheduleId,
                ScheduleName = getSchedule.ScheduleName,
                BranchId = getSchedule.BranchId,
                ClassID = getSchedule.ClassId.HasValue ? getSchedule.ClassId.Value : 0,
                StaffID = getSchedule.StaffId.HasValue ? getSchedule.StaffId.Value : 0,
                isInActive = getSchedule.IsInactive.HasValue ? getSchedule.IsInactive.Value : false,
                CreateAt = getSchedule.CreatedAt.HasValue ? getSchedule.CreatedAt.Value : DateTime.Now,
                CreateBy = getSchedule.CreatedBy.HasValue ? getSchedule.CreatedBy.Value : 0,
                ModifiedAt = getSchedule.ModifiedAt.HasValue ? getSchedule.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = getSchedule.ModifiedBy.HasValue ? getSchedule.ModifiedBy.Value : 0,
                Descriptions = getSchedule.Decriptions,

            };
            return data;
        }

        public void UpdateSchedule(ScheduleModel Schedule)
        {
            var check = ScheduleService.Get(Schedule.ScheduleID);
            var data = new SSchedule
            {
                ScheduleName = Schedule.ScheduleName,
                BranchId = Schedule.BranchId,
                ClassId = Schedule.ClassID,
                StaffId = Schedule.StaffID,
                IsInactive = Schedule.isInActive,
                CreatedAt = Schedule.CreateAt,
                CreatedBy = Schedule.CreateBy,
                ModifiedAt = Schedule.ModifiedAt,
                ModifiedBy = Schedule.ModifiedBy,
                Decriptions = Schedule.Descriptions,
            };
            if (check == null)
            {
                ScheduleService.Add(data);
                return;
            }
            else
            {
                ScheduleService.Update(data);
                return;
            }
        }
        public void DeleteSchedule(int ScheduleID)
        {
            ScheduleService.Delete(ScheduleID);
        }
    }
}
