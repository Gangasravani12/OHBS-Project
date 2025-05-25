import React, { useEffect } from 'react';
import authService from '../api/authservice';

export default function TestAuth() {
  useEffect(() => {
    console.log('➡️ Testing authService.getCurrentUser()');
     console.log('🔍 TestAuth component rendered');
    authService.getCurrentUser()
      .then(u => console.log('✅ getCurrentUser:', u))
      .catch(e => console.warn('❌ getCurrentUser error:', e));

    console.log('➡️ Testing authService.login()');
    authService.login({ email: 'foo', password: 'bar' })
      .then(u => console.log('✅ login:', u))
      .catch(e => console.warn('❌ login error:', e));

    console.log('➡️ Testing authService.register()');
    authService.register({
      name: 'Tester',
      email: 'tester@example.com',
      password: 'test1234',
      phone: '1234567890'
    })
      .then(u => console.log('✅ register:', u))
      .catch(e => console.warn('❌ register error:', e));

    console.log('➡️ Testing authService.logout()');
    authService.logout();
    console.log('🎯 Token after logout:', localStorage.getItem('token'));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🔧 AuthService Tests</h2>
      <p>Open the console and network tab to see the results.</p>
      
    </div>
  );
}
