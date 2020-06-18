const isValidIpAddress = ip => {
  if (isNaN(Number(ip[0]))) return !!ip
  return !!ip.match(
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/m
  )
}

const isValidMicrocontroller = ({ ip, measure, sensor, username }={ }) => {
  return !!(ip && isValidIpAddress(ip.trim()) && measure && sensor && username)
}

module.exports = { isValidMicrocontroller }
