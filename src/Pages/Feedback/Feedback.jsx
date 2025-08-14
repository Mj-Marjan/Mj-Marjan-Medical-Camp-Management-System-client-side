import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

const Feedback = () => {
  const { id } = useParams(); // registrationId
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [campId, setCampId] = useState('');
  const [participantName, setParticipantName] = useState('');

  // ✅ Load registration data to get campId and participantName
  useEffect(() => {
    fetch(`https://medical-camp-server-liart.vercel.app/registrations/${id}`)
      .then(res => res.json())
      .then(data => {
        setFeedbackGiven(data.feedbackGiven);
        setCampId(data.campId); // ✅ set campId from registration
        setParticipantName(data.participantName); // ✅ set participantName
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://medical-camp-server-liart.vercel.app/feedbacks/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        rating: parseInt(rating),
        campId,
        participantName,
      }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Feedback submitted!");
        setFeedbackGiven(true);
        setText('');
        setRating('');
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Give Your Feedback</h2>
      {feedbackGiven ? (
        <p className="text-green-600 font-medium">You have already submitted feedback.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="5"
            placeholder="Your feedback..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <select
            className="select select-bordered w-full mt-4"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <button className="btn btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
