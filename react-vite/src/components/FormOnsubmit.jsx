import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { RangePicker } = DatePicker;
const rangePresets = [
 
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  }
];
const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(8, "Tối thiểu 8 kỹ tự, không được bao gồm chữ viết hoa, số và ký tự đặc biệt.")
    .matches(
      /^[a-z0-9]+$/,
      "Tên người dùng chỉ có thể chứa chữ cái thường và số"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa")
    .matches(/\d/, "Mật khẩu phải chứa ít nhất một số")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận phải trùng khớp"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^0\d{9,10}$/,
      "Số điện thoại phải có ít nhất 10 chữ số và bắt đầu bằng số 0"
    ),
  website: yup
    .string()
    .required("Website is required")
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9]+[.-])+[a-zA-Z0-9]{2,6}$/,
      "Định dạng trang web không hợp lệ.VD: https://example.com"
    ),
  dateOfBirth: yup
    .string()
    .required("Date of Birth is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
      "Ngày sinh phải có định dạng DD-MM-YYYY"
    )
    .test("age", "Age must be between 1980 and 2020", (value) => {
      const year = parseInt(value.split("-")[2], 10);
      return year >= 1980 && year <= 2020;
    }),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  linkedIn: yup
    .string()
    .optional()
    .matches(
      /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      "Định dạng trang web không hợp lệ.VD: https://example.com"
    ),
  facebook: yup
    .string()
    .optional()
    .matches(
      /^https:\/\/(www\.)?facebook\.com\/.*$/,
      "Định dạng trang web không hợp lệ.VD: https://example.com"
    ),
  
   
});

const UserProfileForm = ({ mode }) => {
  const [formMode, setFormMode] = useState(mode || "onSubmit");
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: formMode === "onSubmit" ? "onSubmit" : "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Gửi thành công!", { position: "top-right" });
  };


  

  return (
    
    <form
      className="w-full mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
       <h1 className="mb-6 text-lg font-bold">Thực hành validate form -onSubmit</h1>
      <div className="grid md:grid-cols-2 md:gap-6">
     
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username:</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter username"
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password:</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter password"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Confirm Password:
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Confirm password"
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter email"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Phone Number:</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter phone number"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Website:</label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter website"
              />
            )}
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date of Birth:</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Select date"
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">First Name:</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter first name"
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Last Name:</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter last name"
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">LinkedIn:</label>
          <Controller
            name="linkedIn"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter LinkedIn URL"
              />
            )}
          />
          {errors.linkedIn && (
            <p className="text-red-500 text-xs mt-1">
              {errors.linkedIn.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Facebook:</label>
          <Controller
            name="facebook"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter Facebook URL"
              />
            )}
          />
          {errors.facebook && (
            <p className="text-red-500 text-xs mt-1">
              {errors.facebook.message}
            </p>
          )}
        </div>

        {/* Active Range */}

        {/* Other input fields */}

        {/* Active Range */}
        <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Active Range</label>
                    <Controller
                      name="activeRange"
                      control={control}
                      rules={{
                        required: "Start and End Date are required",
                        validate: (value) => {
                          const startDate = value ? value[0] : null;
                          const endDate = value ? value[1] : null;
                          return (
                            (startDate &&
                              endDate &&
                              new Date(startDate) < new Date(endDate)) ||
                            "Ngày kết thúc phải sau ngày bắt đầu"
                          );
                        },
                      }}
                      render={({ field }) => (
                        <RangePicker
                          {...field}
                          presets={rangePresets}
                          onChange={(dates) => {
                            field.onChange(dates);
                            onRangeChange(dates);
                          }}
                          format="YYYY/MM/DD"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          onBlur={() => trigger("activeRange")}
                        />
                      )}
                    />
                    {errors.activeRange && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.activeRange.message}
                      </p>
                    )}
                  </div>
      </div>

      <button
        type="submit"
        disabled={formMode === "onBlur" && !isValid}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default UserProfileForm;
