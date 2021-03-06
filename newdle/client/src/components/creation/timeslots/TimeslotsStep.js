import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Trans, Plural} from '@lingui/macro';
import _ from 'lodash';
import {Button, Grid, Icon, Segment} from 'semantic-ui-react';
import {setStep} from '../../../actions';
import {getFullTimeslots} from '../../../selectors';
import Availability from './Availability';
import MonthCalendar from './MonthCalendar';
import styles from '../creation.module.scss';

function SelectedDates() {
  const slots = useSelector(getFullTimeslots);
  const numSlots = _.size(slots);
  return (
    <Segment
      size="small"
      className={`${styles['selected-dates']} ${numSlots ? styles.active : ''}`}
      attached="bottom"
    >
      <Plural
        value={numSlots}
        one={
          <Trans>
            <strong>#</strong> slot added
          </Trans>
        }
        other={
          <Trans>
            <strong>#</strong> slots added
          </Trans>
        }
        _0="You haven't added any slots yet"
      />
    </Segment>
  );
}

export default function TimeslotsStep() {
  const dispatch = useDispatch();
  const timeslots = useSelector(getFullTimeslots);
  return (
    <div>
      <Grid container>
        <Grid.Row columns={2}>
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column widescreen={5} computer={6} tablet={8} mobile={16}>
                <MonthCalendar />
                <SelectedDates />
              </Grid.Column>
              <Grid.Column widescreen={11} computer={10} tablet={8} mobile={16}>
                <Availability />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <div className={styles['button-row']}>
            <Button color="violet" icon labelPosition="left" onClick={() => dispatch(setStep(1))}>
              <Trans>Back</Trans>
              <Icon name="angle left" />
            </Button>
            <Button
              color="violet"
              icon
              labelPosition="right"
              disabled={!timeslots.length}
              onClick={() => dispatch(setStep(3))}
            >
              <Trans>Next step</Trans>
              <Icon name="angle right" />
            </Button>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
