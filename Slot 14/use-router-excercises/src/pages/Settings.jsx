import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'vi',
    autoSave: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div>
      <h2>Cài Đặt Hệ Thống</h2>
      <p>Quản lý các cài đặt của ứng dụng:</p>
      
      <form style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            Bật thông báo
          </label>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            />
            Chế độ tối
          </label>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Ngôn ngữ:
          </label>
          <select 
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
            />
            Tự động lưu
          </label>
        </div>
        
        <button 
          type="button"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Cài đặt đã được lưu!')}
        >
          Lưu Cài Đặt
        </button>
      </form>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4>Cài đặt hiện tại:</h4>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Settings;