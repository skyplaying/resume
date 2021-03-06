import React from 'react';
import { Rate, Tag } from 'antd';
import moment from 'moment';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  ZhihuCircleFilled,
  TrophyFilled,
  CheckCircleFilled,
  ScheduleFilled,
  CrownFilled,
} from '@ant-design/icons';
import _ from 'lodash';
import { Avatar } from '../Avatar';
import { ResumeConfig, ThemeConfig } from '../types';
import './index.less';

type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
};

const wrapper = ({ id, title, color }) => WrappedComponent => {
  return (
    <section>
      <div className="section-header">
        {id && (
          <img src={`images/${id}.png`} alt="" width="26px" height="26px" />
        )}
        <h1 style={{ background: color }}>{title}</h1>
      </div>
      <div className="section-body">{WrappedComponent}</div>
    </section>
  );
};

/**
 * @description 简历内容区
 */
export const Resume: React.FC<Props> = props => {
  const { value, theme } = props;

  /** 个人基础信息 */
  const profile = _.get(value, 'profile');

  /** 教育经历 */
  const educationList = _.get(value, 'educationList');

  /** 工作经历 */
  const workExpList = _.get(value, 'workExpList');

  /** 项目经验 */
  const projectList = _.get(value, 'projectList');

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 荣誉奖项 */
  const awardList = _.get(value, 'awardList');

  /** 作品 */
  const workList = _.get(value, 'workList');

  /** 自我介绍 */
  const aboutme = _.split(_.get(value, ['aboutme', 'aboutme_desc']), '\n');

  return (
    <div className="resume-content">
      <div className="basic-info">
        {/* 头像 */}
        {!value?.avatar?.hidden && (
          <Avatar avatarSrc={value?.avatar?.src} className="avatar" />
        )}
        {/* 个人信息 */}
        <div className="profile">
          {profile?.name && <div className="name">{profile.name}</div>}
          <div className="profile-list">
            {profile?.mobile && (
              <div className="email">
                <MobileFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile.mobile}
              </div>
            )}
            {profile?.email && (
              <div className="email">
                <MailFilled style={{ color: theme.color, opacity: 0.85 }} />
                {profile.email}
              </div>
            )}
            {profile?.github && (
              <div className="github">
                <GithubFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.open(profile.github);
                  }}
                >
                  {profile.github}
                </span>
              </div>
            )}
            {profile?.zhihu && (
              <div className="github">
                <ZhihuCircleFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.open(profile.zhihu);
                  }}
                >
                  {profile.zhihu}
                </span>
              </div>
            )}
            {profile?.workExpYear && (
              <div className="work-exp-year">
                <ScheduleFilled style={{ color: theme.color, opacity: 0.85 }} />
                <span>工作经验: {profile.workExpYear}</span>
              </div>
            )}
          </div>
        </div>
        {/* 教育经历 */}
        {educationList?.length ? (
          <section className="section section-education">
            <div className="section-title" style={{ color: theme.color }}>
              教育经历
            </div>
            {educationList.map((education, idx) => {
              const start = moment(education.edu_time[0]).format('YYYY.MM');
              const end = education.edu_time[1]
                ? moment(education.edu_time[1]).format('YYYY.MM')
                : null;
              return (
                <React.Fragment>
                  <div key={idx.toString()} className="education-item">
                    <div>
                      <b>{education.school}</b>
                      <span className="sub-info" style={{ float: 'right' }}>
                        {start}
                        {end ? ` - ${end}` : ' 至今'}
                      </span>
                    </div>
                    <div>
                      {education.major && <span>{education.major}</span>}
                      {education.academic_degree && (
                        <span
                          className="sub-info"
                          style={{ marginLeft: '4px' }}
                        >
                          ({education.academic_degree})
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </section>
        ) : null}
        {/* 荣誉奖项 */}
        {awardList?.length ? (
          <section className="section section-award">
            <div className="section-title" style={{ color: theme.color }}>
              荣誉奖项
            </div>
            {awardList.map((award, idx) => {
              return (
                <div key={idx.toString()}>
                  <TrophyFilled
                    style={{ color: '#ffc107', marginRight: '8px' }}
                  />
                  <b className="info-name">{award.award_info}</b>
                  {award.award_time && (
                    <span className="sub-info award-time">
                      ({award.award_time})
                    </span>
                  )}
                </div>
              );
            })}
          </section>
        ) : null}
        {workList.length ? (
          <section className="section section-work">
            <div className="section-title" style={{ color: theme.color }}>
              个人作品
            </div>
            {workList.map((work, idx) => {
              return (
                <div key={idx.toString()}>
                  <div>
                    <CrownFilled
                      style={{ color: '#ffc107', marginRight: '8px' }}
                    />
                    <b className="info-name">{work.work_name}</b>
                    <a className="sub-info" href={work.visit_link}>
                      访问链接
                    </a>
                  </div>
                  {work.work_desc && <div>{work.work_desc}</div>}
                </div>
              );
            })}
          </section>
        ) : null}
        {/* 个人技能 */}
        {skillList?.length ? (
          <section className="section section-skill">
            <div className="section-title" style={{ color: theme.color }}>
              技能
            </div>
            {skillList.map(skill => {
              return skill ? (
                <React.Fragment>
                  <div className="section-info">
                    <b className="info-name">{skill.skill_name}</b>
                    <Rate
                      allowHalf
                      disabled
                      value={skill.skill_level / 20}
                      className="skill-rate"
                    />
                  </div>
                  {_.split(skill.skill_desc, '\n').map(d => (
                    <div className="skill-detail-item">
                      <CheckCircleFilled
                        style={{ color: '#ffc107', marginRight: '8px' }}
                      />
                      {d}
                    </div>
                  ))}
                </React.Fragment>
              ) : null;
            })}
          </section>
        ) : null}
      </div>
      <div className="main-info">
        {wrapper({
          id: 'work-experience',
          title: '工作经历',
          color: theme.color,
        })(
          <div className="section section-work-exp">
            {_.map(workExpList, (work, idx) => {
              const start = moment(work.work_time[0]).format('YYYY.MM');
              const end = work.work_time[1]
                ? moment(work.work_time[1]).format('YYYY.MM')
                : null;
              return work ? (
                <div className="section-item">
                  <div className="section-info" key={idx}>
                    <b className="info-name">
                      {work.company_name}
                      <span className="sub-info">{work.department_name}</span>
                    </b>
                    <span className="info-time">
                      {start}
                      {end ? ` - ${end}` : ' 至今'}
                    </span>
                  </div>
                  <div>{work.work_desc}</div>
                </div>
              ) : null;
            })}
          </div>
        )}

        {wrapper({ id: 'skill', title: '项目经历', color: theme.color })(
          <div className="section section-project">
            {_.map(projectList, (project, idx) =>
              project ? (
                <div className="section-item">
                  <div className="section-info" key={idx}>
                    <b className="info-name">{project.project_name}</b>
                    {project.project_role && (
                      <Tag color={theme.tagColor}>{project.project_role}</Tag>
                    )}
                  </div>
                  <div className="section-detail">
                    <b>项目描述：</b>
                    <span>{project.project_desc}</span>
                  </div>
                  <div className="section-detail">
                    <b>主要工作：</b>
                    <span>{project.project_content}</span>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
        {!!_.trim(_.join(aboutme, '')) &&
          wrapper({
            id: 'love',
            title: '自我介绍',
            color: theme.color,
          })(
            <div>
              {aboutme.map((d, idx) => (
                <div key={`${idx}`}>{d}</div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};
