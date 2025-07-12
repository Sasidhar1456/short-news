

const baseUrl = import.meta.env.VITE_API_BASE_URL || '';


async function refreshAccessToken(navigate) {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrl}/user/v1/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken, accessToken }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to refresh token');

    // Save new token
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;

  } catch (err) {
    // Refresh token invalid or expired
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    throw new Error('Session expired. Please login again.');
  }
}

export async function getNews(country = 'us', navigate) {
  let token = localStorage.getItem('accessToken');

  let res = await fetch(`${baseUrl}/api/v1/news/country?country=${country}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    
  });

  console.log('First response status:', res.status);

  if (res.status !== 200) {
    // Token might be expired - try refreshing
    token = await refreshAccessToken(navigate);



    // Retry the original request with new token
    res = await fetch(`${baseUrl}/api/v1/news/country?country=${country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
     
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news');
  }

  return data.articles;
}

export async function saveNews(body, navigate) {
  let token = localStorage.getItem('accessToken');

  let res = await fetch(`${baseUrl}/saved-news/v1/saveNews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    body: JSON.stringify(body),


    
  });

  console.log('First response status:', res.status);

  if (res.status !== 200) {
    // Token might be expired - try refreshing
    token = await refreshAccessToken(navigate);



    // Retry the original request with new token
    res = await fetch(`${baseUrl}/saved-news/v1/saveNews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
     
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news');
  }

  return data.articles;
}


export async function deleteNews(body, navigate) {
  let token = localStorage.getItem('accessToken');

  let res = await fetch(`${baseUrl}/saved-news/v1/deleteNews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    body: JSON.stringify(body),


    
  });

  console.log('First response status:', res.status);

  if (res.status !== 200) {
    // Token might be expired - try refreshing
    token = await refreshAccessToken(navigate);



    // Retry the original request with new token
    res = await fetch(`${baseUrl}/saved-news/v1/deleteNews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
     
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news');
  }

  return data.articles;
}

export async function getSavedNews(navigate) {
  let token = localStorage.getItem('accessToken');

  let res = await fetch(`${baseUrl}/saved-news/v1/getSavedNews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    
  });

  console.log('First response status:', res.status);

  if (res.status !== 200) {
    // Token might be expired - try refreshing
    token = await refreshAccessToken(navigate);



    // Retry the original request with new token
    res = await fetch(`${baseUrl}/saved-news/v1/getSavedNews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
     
    });
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch news');
  }

  return data;
}
