/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import pluginId from '../../pluginId';
import { request } from 'strapi-helper-plugin';
import loadKey from '../../utils/loadKey';
import loadConfig from '../../utils/loadConfig';
import bible from '../../utils/bible';
import { useIntl } from 'react-intl'
import { Label, Select } from '@buffetjs/core';
import { Header } from '@buffetjs/custom';
import { Panel, Form, ControlWrapper } from '../../components';

const LANGS = [
  {
    label: 'Español (Spanish)',
    value: 'spa'
  },
  {
    label: 'English',
    value: 'eng'
  }
];

const HomePage = () => {
  const [lang, setLang] = useState(LANGS[0].value);
  const [allVersions, setAllVersions] = useState([]);
  const [versions, setVersions] = useState([]);
  const [version, setVersion] = useState();
  const intl = useIntl();
  
  useEffect(() => {
    (async () => {
      const pk = await loadKey();
      const config = await loadConfig();
      setLang(config.lang);
      setVersion(config.version);
      const service = bible(pk);
      LANGS.forEach(async ({ value }) => {
        try {
          let ver = await service.get('/bibles', {
          params: {
            language: value
          }
          });
          if (ver.data.data.length === 0) {
            strapi.notification.error('Check your API key');
          }
          ver = await ver.data.data.map(({ id, nameLocal, language }) => ({
            label: nameLocal,
            value: id,
            language: language.id
          }));
          setAllVersions(versions => ([...versions, ...ver]));
        } catch({ message }) {
          strapi.notification.error(message);
        }
      });
    })();
  }, []);
  
  useEffect(() => {
    setVersions(getVersionsByLang(lang, allVersions));
  }, [lang, allVersions]);
  
  const getVersionsByLang = (lang, versionsArray) => versionsArray.filter(({ language }) => language === lang);
  
  const updateConfig = async () => {
    try {
      strapi.lockApp();
      const res = await request(`/${pluginId}/config`, {
        method: 'POST',
        body: {
          config: {
            lang,
            version
          }
        }
      })
      strapi.notification.success(intl.formatMessage({ id:`${pluginId}.config.success` }));
    } catch({ message }) {
      strapi.notification.error(message);
    }
    strapi.unlockApp();
  };
  
  const actions = [
    {
      label: intl.formatMessage({ id:`${pluginId}.config.save` }),
      onClick: updateConfig,
      color: 'success',
      type: 'submit',
    }
  ];
  return (
    <>
      <Header
        actions={actions}
        title={{ label: intl.formatMessage({ id:`${pluginId}.plugin.name` }) }}
        content={intl.formatMessage({ id:`${pluginId}.config.desc` })}
      />
      <Panel>
        <Form>
          <ControlWrapper>
            <Label htmlFor='lang'>{intl.formatMessage({ id:`${pluginId}.config.lang` })}</Label>
            <Select
              name='lang'
              onChange={({ target: { value } }) => {
                setLang(value);
              }}
              options={LANGS}
              value={lang}
            />
          </ControlWrapper>
          { versions && versions.length > 0 && version &&
            <ControlWrapper>
              <Label htmlFor='version'>{intl.formatMessage({ id:`${pluginId}.config.version` })}</Label>
              <Select
                name='version'
                onChange={({ target: { value } }) => {
                  setVersion(value);
                }}
                options={versions}
                value={version}
              />
            </ControlWrapper>
          }
        </Form>
      </Panel>
    </>
  );
};

export default memo(HomePage);
