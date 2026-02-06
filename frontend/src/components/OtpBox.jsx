import { useState } from "react";
import api from "../services/api";

const OtpBox = ({ visible, description, otpTarget, onClose, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const verifyOtp = async () => {
    if (otp.length !== 6) return;

    setLoading(true);
    setError("");

    const res = await api.post("/verify-otp", { value: otpTarget, otp });
    setLoading(false);

    if (res.data.success) {
      onVerified();
      onClose();
    } else {
      setError("Invalid or expired OTP");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6">

        <h3 className="text-xl font-semibold text-purple-600 mb-2">
          {description[0]?.title}
        </h3>

        <p className="text-sm text-gray-600 mb-5">{description[0]?.message}</p>
        {/* OTP Input */}
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-2 rounded-lg border mb-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">

          <button
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={verifyOtp}
            disabled={loading || otp.length !== 6}
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpBox;
