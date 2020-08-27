import React, { useEffect, useState } from 'react';
import { request } from 'strapi-helper-plugin';
import pluginId from '../../pluginId';
import { useIntl } from 'react-intl'
import { Label, InputText } from '@buffetjs/core';
import { Header } from '@buffetjs/custom';
import { Panel } from '../Misc';
import loadKey from '../../utils/loadKey';

const Settings = () => {
  const [key, setKey] = useState('');
  const intl = useIntl();
  
  useEffect(() => {
    (async () => {
      const pk = await loadKey();
      setKey(pk);
    })();
  }, []);
  
  const updateKey = async () => {
    try {
      strapi.lockApp();
      const res = await request(`/${pluginId}/settings`, {
        method: 'POST',
        body: {
          apiKey: key
        }
      })
      strapi.notification.success(intl.formatMessage({ id:`${pluginId}.settings.success` }));
    } catch({ message }) {
      strapi.notification.error(message);
    }
    strapi.unlockApp();
  };
  
  const actions = [
    {
      label: intl.formatMessage({ id:`${pluginId}.settings.save` }),
      onClick: updateKey,
      color: 'success',
      type: 'submit',
    }
  ];

  return (
    <>
      <Header
        actions={actions}
        title={{ label: intl.formatMessage({ id:`${pluginId}.plugin.name` }) }}
        content={intl.formatMessage({ id:`${pluginId}.settings.desc` })}
      />
      <Panel>  
        <Label htmlFor='key'>{intl.formatMessage({ id:`${pluginId}.settings.apiKey` })}</Label>
        <InputText
          name='key'
          onChange={({ target: { value } }) => {
            setKey(value);
          }}
          placeholder='API Key'
          type='password'
          value={key}
        />
      </Panel>
    </>
  );
};

export default Settings;
