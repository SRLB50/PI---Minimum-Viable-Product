export const headerBase = {
    "headers": {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": 'no-store, no-cache, must-revalidate'
    }
  }
    
  export const getApiBaseUrl = () => {
    const url = `${import.meta.env.VITE_API}`
    return url
  } 