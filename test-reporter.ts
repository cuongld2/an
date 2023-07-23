import { TestInfo } from '@playwright/test';
import { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import {ReportingApi} from '@reportportal/agent-js-playwright';
import { addScreenshot } from './utils/screenshot';


class MyReporter implements Reporter {

listFailedTests : string[] = []

  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
    ReportingApi.setTestCaseId(test.title);
  }

  onTestEnd(test:TestCase, result:TestResult,) {
    console.log(`Finished test ${test.title}: ${result.status}`);

    if (result.status=='failed'){
        ReportingApi.setStatus('FAILED');

    } else if (result.status=='passed'){
        ReportingApi.setStatus('PASSED');
    }
  }

  async onEnd(result:FullResult) {
    console.log(`Finished the run: ${result.status}`);

  }
}
export default MyReporter;
