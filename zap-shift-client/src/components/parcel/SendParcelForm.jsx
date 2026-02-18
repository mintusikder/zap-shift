import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import warehouseData from "../../assets/data/warehouses.json";
import useAuth from "../../hook/useAuth";


const SendParcelForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const parcelType = watch("parcelType");
  const senderCity = watch("senderCity");
  const receiverCity = watch("receiverCity");

  // ✅ Get Unique Cities
  const cities = useMemo(() => {
    return [...new Set(warehouseData.map((item) => item.city))];
  }, []);

  // ✅ Get Covered Areas
  const getCoveredAreas = (city) => {
    if (!city) return [];
    const filtered = warehouseData.filter((item) => item.city === city);
    const areas = filtered.flatMap((item) => item.covered_area || []);
    return [...new Set(areas)];
  };

  // ✅ Calculate Delivery Cost
  const calculateCost = (data) => {
    let cost = 0;
    if (data.parcelType === "document") cost = 50;
    else {
      cost = 100;
      if (data.weight) cost += Number(data.weight) * 10;
    }

    if (data.senderCity !== data.receiverCity) cost += 50;

    return cost;
  };

  // ✅ Submit Handler
  const onSubmit = (data) => {
    if (!user) {
      Swal.fire("Login Required", "Please login first!", "warning");
      return;
    }

    const cost = calculateCost(data);

    const finalData = {
      ...data,
      deliveryCost: cost,
      trackingId: "TRK-" + Date.now(),
      userName: user?.displayName,
      userEmail: user?.email,
      creation_date: new Date(),
      status: "Pending",
      paymentStatus: "Unpaid",
      deliveryType:
        data.senderCity === data.receiverCity
          ? "Same City"
          : "Outside City",
    };
    console.log(finalData)
    Swal.fire({
      title: "Confirm Your Parcel",
      html: `
        <div style="text-align:left;font-size:14px">
          <p><strong>Tracking ID:</strong> ${finalData.trackingId}</p>
          <p><strong>Parcel:</strong> ${data.title}</p>
          <p><strong>Type:</strong> ${data.parcelType}</p>
          <p><strong>Sender:</strong> ${data.senderCity}</p>
          <p><strong>Receiver:</strong> ${data.receiverCity}</p>
          <p><strong>Delivery Type:</strong> ${finalData.deliveryType}</p>
          <p><strong>Total Cost:</strong> ৳ ${cost}</p>
          <p><strong>Status:</strong> Pending</p>
          <p><strong>Payment:</strong> Unpaid</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Continue Edit",
      confirmButtonColor: "#CAEB66",
    }).then((result) => {
      if (result.isConfirmed) {
        saveParcel(finalData);
      }
    });
  };

  // ✅ Save Parcel to Database
  const saveParcel = async (parcelData) => {
    try {
      setLoading(true);
      console.log("Saving Parcel Data:", parcelData);
      // await axios.post("http://localhost:5000/parcels", parcelData);

      Swal.fire({
        icon: "success",
        title: "Parcel Saved Successfully!",
        text: "Now redirect to payment page.",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      Swal.fire("Error", "Failed to save parcel", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold text-center">Send a Parcel</h2>
        <p className="text-center text-gray-500 mb-6">
          Door to Door Parcel Delivery Service
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Parcel Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Parcel Info</h3>

            <select
              {...register("parcelType", { required: "Type is required" })}
              className="input w-full mb-3"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            {errors.parcelType && (
              <p className="text-red-500">{errors.parcelType.message}</p>
            )}

            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Parcel Title"
              className="input w-full mb-3"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            {parcelType === "non-document" && (
              <input
                type="number"
                {...register("weight", {
                  required: "Weight is required",
                  min: { value: 1, message: "Minimum weight 1kg" },
                })}
                placeholder="Weight (KG)"
                className="input w-full mb-3"
              />
            )}
          </div>

          {/* Sender Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Sender Info</h3>

            <input
              {...register("senderName", { required: true })}
              defaultValue={user?.displayName}
              placeholder="Sender Name"
              className="input w-full mb-3"
            />

            <input
              {...register("senderContact", { required: true })}
              placeholder="Contact"
              className="input w-full mb-3"
            />

            <select
              {...register("senderCity", { required: true })}
              className="input w-full mb-3"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={`sender-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              {...register("senderCoveredArea", { required: true })}
              disabled={!senderCity}
              className="input w-full mb-3"
            >
              <option value="">Select Covered Area</option>
              {getCoveredAreas(senderCity).map((area) => (
                <option key={`sender-area-${area}`} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <input
              {...register("senderAddress", { required: true })}
              placeholder="Address"
              className="input w-full mb-3"
            />

            <textarea
              {...register("pickupInstruction", { required: true })}
              placeholder="Pickup Instruction"
              className="input w-full"
            />
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Receiver Info</h3>

            <input
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
              className="input w-full mb-3"
            />

            <input
              {...register("receiverContact", { required: true })}
              placeholder="Contact"
              className="input w-full mb-3"
            />

            <select
              {...register("receiverCity", { required: true })}
              className="input w-full mb-3"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={`receiver-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              {...register("receiverCoveredArea", { required: true })}
              disabled={!receiverCity}
              className="input w-full mb-3"
            >
              <option value="">Select Covered Area</option>
              {getCoveredAreas(receiverCity).map((area) => (
                <option key={`receiver-area-${area}`} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <input
              {...register("receiverAddress", { required: true })}
              placeholder="Address"
              className="input w-full mb-3"
            />

            <textarea
              {...register("deliveryInstruction", { required: true })}
              placeholder="Delivery Instruction"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black py-2 rounded"
          >
            {loading ? "Processing..." : "Submit Parcel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcelForm;
