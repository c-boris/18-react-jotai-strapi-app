import PropTypes from 'prop-types';

export const Post = ({data}) => {
  return (
    <h2>{data.attributes.text}</h2>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};