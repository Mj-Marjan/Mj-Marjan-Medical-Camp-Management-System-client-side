import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateCamp = () => {
  const { campName, image, fees, dateTime, location, description, doctor, _id } = useLoaderData();

  const handleUpdateCamp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    fetch(`https://medical-camp-server-liart.vercel.app/camps/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Update A Camp
      </h2>

      <form onSubmit={handleUpdateCamp} className="space-y-5">
        {/* Camp Name */}
        <div>
          <label className="label">Camp Name</label>
          <input
            type="text"
            name="campName"
            defaultValue={campName}
            className="input input-bordered w-full"
            placeholder="Enter Camp Name"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={image}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
        </div>

        {/* Camp Fees */}
        <div>
          <label className="label">Camp Fees</label>
          <input
            type="number"
            name="fees"
            defaultValue={fees}
            className="input input-bordered w-full"
            placeholder="Enter Camp Fees"
          />
        </div>

        {/* Date and Time */}
        <div>
          <label className="label">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            defaultValue={dateTime}
            className="input input-bordered w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            className="input input-bordered w-full"
            placeholder="Enter Location"
          />
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label className="label">Healthcare Professional</label>
          <input
            type="text"
            name="doctor"
            defaultValue={doctor}
            className="input input-bordered w-full"
            placeholder="Enter Professional Name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            defaultValue={description}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Write camp details here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Update Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCamp;
