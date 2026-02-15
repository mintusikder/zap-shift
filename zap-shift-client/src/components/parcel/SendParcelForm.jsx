import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import warehouseData from "../../assets/data/warehouses.json";

const SendParcelForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [deliveryCost, setDeliveryCost] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const parcelType = watch("parcelType");
  const senderCity = watch("senderCity");
  const receiverCity = watch("receiverCity");

  // ✅ Get Unique Cities
  const cities = useMemo(() => {
    return [...new Set(warehouseData.map((item) => item.city))];
  }, []);

  // ✅ Get Covered Areas for a city
  const getCoveredAreas = (city) => {
    if (!city) return [];

    const filtered = warehouseData.filter((item) => item.city === city);
    const areas = filtered.flatMap((item) => item.covered_area || []);
    return [...new Set(areas)]; // remove duplicates
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

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setDeliveryCost(cost);
    setFormData(data);

    toast(
      (t) => (
        <div>
          <p className="font-semibold text-lg">Delivery Cost: ৳ {cost}</p>
          <button
            onClick={() => confirmOrder(t.id)}
            className="bg-green-600 text-white px-4 py-1 mt-3 rounded"
          >
            Confirm Order
          </button>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const confirmOrder = async (toastId) => {
    setLoading(true);
    try {
      const finalData = {
        ...formData,
        deliveryCost,
        creation_date: new Date(),
        status: "Pending",
      };
      await axios.post("http://localhost:5000/parcels", finalData);
      toast.success("Parcel Saved Successfully!");
      reset();
      setDeliveryCost(null);
    } catch (error) {
      toast.error("Failed to save parcel.");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
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
            {errors.parcelType && <p className="text-red-500">{errors.parcelType.message}</p>}

            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Parcel Title"
              className="input w-full mb-3"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            {parcelType === "non-document" && (
              <input
                type="number"
                {...register("weight", { required: "Weight is required", min: { value: 1, message: "Minimum weight 1kg" } })}
                placeholder="Weight (KG)"
                className="input w-full mb-3"
              />
            )}
          </div>

          {/* Sender Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Sender Info</h3>
            <input {...register("senderName", { required: true })} defaultValue="Mintu Sikder" placeholder="Sender Name" className="input w-full mb-3" />
            <input {...register("senderContact", { required: true })} placeholder="Contact" className="input w-full mb-3" />

            <select {...register("senderCity", { required: true })} className="input w-full mb-3">
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={`sender-${city}`} value={city}>{city}</option>
              ))}
            </select>

            <select {...register("senderCoveredArea", { required: true })} disabled={!senderCity} className="input w-full mb-3">
              <option value="">Select Covered Area</option>
              {getCoveredAreas(senderCity).map((area) => (
                <option key={`sender-area-${area}`} value={area}>{area}</option>
              ))}
            </select>

            <input {...register("senderAddress", { required: true })} placeholder="Address" className="input w-full mb-3" />
            <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" className="input w-full" />
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Receiver Info</h3>
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input w-full mb-3" />
            <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input w-full mb-3" />

            <select {...register("receiverCity", { required: true })} className="input w-full mb-3">
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={`receiver-${city}`} value={city}>{city}</option>
              ))}
            </select>

            <select {...register("receiverCoveredArea", { required: true })} disabled={!receiverCity} className="input w-full mb-3">
              <option value="">Select Covered Area</option>
              {getCoveredAreas(receiverCity).map((area) => (
                <option key={`receiver-area-${area}`} value={area}>{area}</option>
              ))}
            </select>

            <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input w-full mb-3" />
            <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input w-full" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-black py-2 rounded">
            {loading ? "Processing..." : "Submit Parcel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcelForm;
