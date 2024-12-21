import {
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import Flag from "react-world-flags";
import "./index.scss";
import { countries } from "../../constants/countriesWithCodes";
import { useNavigate } from "react-router-dom";
import { Upload, Image, UploadFile, UploadProps, GetProp, Button } from "antd";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { IUser } from "../../types";
import { registerUser } from "../../services/apiService";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUser>();

  const onSubmit = async (formData: IUser) => {
    setLoading(true);

    try {
      const result = await registerUser(formData);

      navigate("/room");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...result.user,
          profileImg: previewImage,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Username")) {
          setError("username", {
            type: "manual",
            message: error.message,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleImageChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    if (newFileList && newFileList[0]) {
      const file = newFileList[0];
      if (file.originFileObj) {
        const base64Image = await getBase64(file.originFileObj as FileType);
        setPreviewImage(base64Image);
      }
    }
  };

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <div className="registerForm">
      <div className="registerForm__formContainer">
        <h2 className="registerForm__title">JOIN CHAT ROOM</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="registerForm__imageUpload">
            <Upload
              accept=".jpg,.jpeg,.png"
              beforeUpload={() => {}}
              action={undefined}
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleImageChange}
              customRequest={({ file, onSuccess }) => {
                if (onSuccess) {
                  onSuccess(file);
                }
              }}
            >
              {fileList.length >= 1 ? null : (
                <button type="button" className="registerForm__uploadButton">
                  <AddIcon />
                  <div className="mt-10">Upload</div>
                </button>
              )}
            </Upload>

            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                src={previewImage}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: () => {},
                }}
              />
            )}
          </div>

          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 10,
                message: "Username must not be less than 10 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={
                  errors.username?.message
                    ? String(errors.username.message)
                    : ""
                }
              />
            )}
          />
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.gender}
            sx={{ color: "#008080" }}
          >
            <InputLabel>Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gender"
                  input={<OutlinedInput label="Gender" />}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              {errors.gender ? String(errors.gender.message) : ""}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.country}
          >
            <InputLabel>Country</InputLabel>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Country"
                  input={<OutlinedInput label="Country" />}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      <div className="registerForm__countryInputMenu">
                        <Flag
                          code={country.code}
                          className="registerForm__countryInputFlagIcon"
                        />
                        {country.label}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.country ? String(errors.country.message) : ""}
            </FormHelperText>
          </FormControl>
          <Button
            className="registerForm__submitButton"
            loading={isLoading}
            htmlType="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
