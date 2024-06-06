import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getSingelAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getSingelAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved succssfully",
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminService.getAllAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved successfully",
    data: result,
  });
});


//update Admin data 
const updateAdminDb  = catchAsync(async(req, res, next) =>{
    const {id} = req.params;
    const payload = req.body;
    const result = await AdminService.updateAdmin(id, payload);

    sendResponse(res, {
        statusCode:httpStatus.OK, 
        success:true,
        message:"Admin is updated successfully",
        data:result
    })
})

export const AdminControllar = {
  getSingelAdmin,
  getAllAdmin,
  updateAdminDb
};
