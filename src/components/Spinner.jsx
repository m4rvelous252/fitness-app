import ReactLoading from 'react-loading';

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      <ReactLoading type='spin' color={getComputedStyle(document.documentElement)
    .getPropertyValue('--main-theme-color')} height={64} width={64} />
    </div> 
  )
}
export default Spinner