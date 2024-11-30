import React, { useEffect, useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CustomFileInput from "../../Components/CustomFileInput";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../redux/actions/admin/productActions";
import CustomSingleFileInput from "../../Components/CustomSingleFileInput";
import ConfirmModal from "../../../../components/ConfirmModal";
import BreadCrumbs from "../../Components/BreadCrumbs";
import toast from "react-hot-toast";
import { getCategories } from "../../../../redux/actions/admin/categoriesAction";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [statusList, setStatusList] = useState([
    "Draft",
    "Published",
    "Unpublished",
    "Out of Stock",
    "Low Quantity",
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("Published");
  const [attributes, setAttributes] = useState([]);
  const [price, setPrice] = useState("");
  const [markup, setMarkup] = useState("");
  const [moreImageURL, setMoreImageURL] = useState("");
  const [offer, setOffer] = useState("");

const [size, setSize] = useState("");
const [color, setColor] = useState("");
const [quantity, setQuantity] = useState("");

const attributeHandler = (e) => {
  e.preventDefault();

  if (size.trim() === "" || color.trim() === "" || quantity <= 0) {
    toast.error("All fields are required and quantity must be greater than 0");
    return;
  }

  const attribute = { size, color, quantity };
  setAttributes([...attributes, attribute]);

  // Reset fields
  setSize("");
  setColor("");
  setQuantity("");
};

  const handleSingleImageInput = (img) => {
    setImageURL(img);
  };

  const handleMultipleImageInput = (files) => {
    setMoreImageURL(files);
  };

  const handleSave = () => {
    if (price <= 0) {
      toast.error("Price should be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("price", price);
    formData.append("markup", markup);
    formData.append("category", category);
    formData.append("offer", offer);
    formData.append("status", status.toLowerCase());
    formData.append("imageURL", imageURL);

    for (const file of moreImageURL) {
      formData.append("moreImageURL", file);
    }

    dispatch(createProduct(formData));
    navigate(-1);
  };


  const [showConfirm, setShowConfirm] = useState(false);

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      {/* Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Confirm Save?"
          negativeAction={toggleConfirm}
          positiveAction={handleSave}
        />
      )}
      {/* Product add page */}
      <div className="p-5 w-full overflow-y-scroll text-sm">
        {/* Top Bar */}
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Add Products</h1>
            <BreadCrumbs
              list={["Dashboard", "Products List", "Add Products"]}
            />
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={toggleConfirm}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
        {/* Product Section */}
        <div className="lg:flex ">
          {/* Product Information */}
          <div className="lg:w-4/6 lg:mr-5">
            <div className="admin-div lg:flex gap-5">
              <div className="lg:w-1/3 mb-3 lg:mb-0">
                <h1 className="font-bold mb-3">Product Thumbnail</h1>
                <CustomSingleFileInput onChange={handleSingleImageInput} />
              </div>
              <div className="lg:w-2/3">
                <h1 className="font-bold">Product Information</h1>
                <p className="admin-label">Title</p>
                <input
                  type="text"
                  placeholder="Type product name here"
                  className="admin-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="admin-label">Description</p>
                <textarea
                  name="description"
                  id="description"
                  className="admin-input h-52"
                  placeholder="Type product description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            {/* Image Uploading */}
            <div className="admin-div">
              <h1 className="font-bold">Product Images</h1>
              <p className="admin-label my-2">Drop Here</p>
              <CustomFileInput onChange={handleMultipleImageInput} />
            </div>
            {/* Attributes */}
            <div className="admin-div">
    <h1 className="font-bold mb-2">Product Attributes</h1>
    <form
      className="flex flex-col lg:flex-row items-center gap-3"
      onSubmit={attributeHandler}
    >
      <input
        type="text"
        className="admin-input-no-m w-full"
        placeholder="Size (e.g., S, M, L, XL)"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <input
        type="text"
        className="admin-input-no-m w-full"
        placeholder="Color (e.g., Red, Blue)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type="number"
        className="admin-input-no-m w-full"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button
        type="submit"
        className="admin-button-fl w-full lg:w-auto bg-blue-700 text-white"
      >
        Add Attribute
      </button>
    </form>

    {/* Display Added Attributes */}
    <div className="border mt-5 rounded-lg">
      {attributes.map((attr, index) => (
        <div
          key={index}
          className={`flex px-2 py-1 ${index % 2 === 0 ? "bg-gray-200" : ""}`}
        >
          <p className="w-1/3">{attr.size}</p>
          <p className="w-1/3">{attr.color}</p>
          <p className="w-1/3">{attr.quantity}</p>
        </div>
      ))}
    </div>
  </div>
          </div>
          {/* Pricing */}
          <div className="lg:w-2/6">
            <div className="admin-div">
              <h1 className="font-bold">Product Pricing</h1>
              <p className="admin-label">Amount</p>
              <input
                type="number"
                placeholder="Type product price here"
                className="admin-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="admin-label">Markup</p>
              <input
                type="number"
                placeholder="Type product markup here"
                className="admin-input"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
              />
              <p className="admin-label">Offer</p>
              <input
                type="number"
                placeholder="Type product offer here"
                className="admin-input"
                value={offer}
                min={1}
                max={100}
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>
            <div className="admin-div">
              <h1 className="font-bold">Other Details</h1>
              <p className="admin-label">Category</p>
              <select
                className="admin-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {!loading &&
                  categories?.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <p className="admin-label">Status</p>
              <select
                className="admin-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusList.map((stat, index) => (
                  <option value={stat} key={index}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
