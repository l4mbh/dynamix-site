import ReactDOM from 'react-dom';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import MainButton from './MainButton';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const Modal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 h-screen" onClick={onClose}>
      <motion.div
        className="bg-white w-100 md:w-1/2 h-[500px] rounded-lg shadow-lg relative"
        initial={{ y: '-100px', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100px', opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center h-full">
          {/* Thẻ bên trái chứa ảnh */}
          <div className="w-1/2 h-full bg-center bg-cover rounded-l-lg" style={{ backgroundImage: 'url(http://localhost:1337/uploads/form_2abc0fd724.png)' }}>
            {/* Ảnh sẽ lấp đầy chiều cao thẻ cha */}
          </div>

          {/* Thẻ bên phải chứa form */}
          <div className="w-1/2 h-full p-8">
            <h3 className="text-lg font-semibold mb-4 capitalize">Let Us Join With You on the Journey to Success</h3>
            <form >
              {/* Họ tên */}
              <div className="mb-4">
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className="!focus:ring-2 !focus:border-yellow-500 !focus:border-transparent"
                  sx={{
                    // Root class for the input field
                    "& .MuiOutlinedInput-root": {
                      color: "#000",
                      fontFamily: "Arial",
                      // Class for the border around the input field
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EAB308",
                        borderWidth: "2px",
                      },
                    },
                    // Class for the label of the input field
                    "& .MuiInputLabel-outlined": {
                      color: "#000",
                    },
                  }}
                />
              </div>

              {/* Số điện thoại */}
              <div className="mb-4">
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className="focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  sx={{
                    // Root class for the input field
                    "& .MuiOutlinedInput-root": {
                      color: "#000",
                      fontFamily: "Arial",
                      // Class for the border around the input field
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EAB308",
                        borderWidth: "2px",
                      },
                    },
                    // Class for the label of the input field
                    "& .MuiInputLabel-outlined": {
                      color: "#000",
                    },
                  }}
                />
              </div>

              <div className="mb-4">
                <TextField
                  label="What's your project about?"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className="focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  sx={{
                    // Root class for the input field
                    "& .MuiOutlinedInput-root": {
                      color: "#000",
                      fontFamily: "Arial",
                      // Class for the border around the input field
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EAB308",
                        borderWidth: "2px",
                      },
                    },
                    // Class for the label of the input field
                    "& .MuiInputLabel-outlined": {
                      color: "#000",
                    },
                  }}
                />
              </div>

              {/* Gửi thông tin */}
              <MainButton title="Submit" />
            </form>
          </div>
        </div>
      </motion.div>
    </div>
    ,
    document.body
  );
};

export default Modal;
