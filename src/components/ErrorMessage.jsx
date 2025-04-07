import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return (
    <div className="text-center py-8 text-red-600 font-semibold">
      ⚠️ {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
