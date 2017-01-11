<?php

/**
 * Description of ComplainAction
 * 
 * 活动学分、诚信值、申请学分申诉校方管理
 *
 * @author zhuhaibing@tiangongwang.com
 */
class ComplainAction extends BaseAction {

    /**
     * 
     */
    protected $userCreditModel;
    protected $ajaxReturn;

    /**
     * 
     */
    function __construct() {
        parent::__construct();
        $this->userCreditModel = model('UserCredit');
        $this->ajaxReturn = array(
            'status' => 0,
            'info' => '系统异常'
        );
    }

    /**
     * 功能描述页
     */
    public function index() {
        $this->display();
    }

    /**
     * 申诉列表页
     */
    public function lists() {
        $map['school_id'] = $this->sid;
        $map['status'] = 0;
        $map['do_status'] = 0;
        $order = '`id` DESC';
        $lists = M('school_complain')->where($map)->order($order)->findPage(10);
        foreach ($lists['data'] as &$v) {
            $v['user_real_name'] = getUserField($v['user_id'], 'realname');
            $system_reason_desc = '';
            if (!empty($v['system_reason_id'])) {
                $system_reason_desc_array = $this->userCreditModel->eventComplainReason($v['system_reason_id']);
                $system_reason_desc = $system_reason_desc_array['title'];
            }
            $v['system_reason_desc'] = $system_reason_desc;
            $v['project_type_name'] = $this->userCreditModel->getComplainProjectType($v['project_type']);
            $getProjectDetail = $this->userCreditModel->getProjectDetail($v['project_type'], $v['complain_project_id'], $v['school_id']);
            $complain_project_name = '';
            if (!empty($getProjectDetail)) {
                $complain_project_name = $getProjectDetail['title'];
            }
            $v['complain_project_name'] = $complain_project_name;
            $v['picture_string'] = $this->userCreditModel->getComplainImage($v['picture_id']);
        }
        $this->assign($lists);
        $this->display();
    }

    /**
     * 申诉详情
     */
    public function detail() {
        $id = intval($_GET['id']);
        $map['id'] = $id;
        $info = $this->userCreditModel->getComplain($map);
        if (!empty($info)) {
            $info['user_real_name'] = getUserField($info['user_id'], 'realname');
            $system_reason_desc = '';
            if (!empty($info['system_reason_id'])) {
                $system_reason_desc_array = $this->userCreditModel->eventComplainReason($info['system_reason_id']);
                $system_reason_desc = $system_reason_desc_array['title'];
            }
            $info['system_reason_desc'] = $system_reason_desc;
            $info['project_type_name'] = $this->userCreditModel->getComplainProjectType($info['project_type']);
            $getProjectDetail = $this->userCreditModel->getProjectDetail($info['project_type'], $info['complain_project_id'], $info['school_id']);
            $complain_project_name = '';
            if (!empty($getProjectDetail)) {
                $complain_project_name = $getProjectDetail['title'];
            }
            $info['complain_project_name'] = $complain_project_name;
            $info['picture_string'] = $this->userCreditModel->getComplainImage($info['picture_id']);
        }
        $this->assign($info);
        $this->display();
    }

    /**
     * 处理
     */
    public function pass() {
        $id = intval($_GET['id']);
        $this->assign('id', $id);
        $this->display();
    }

    /**
     * 回复处理
     */
    public function doPass() {
        $id = intval($_POST['id']);
        $do_reject_reason = strip_tags(t($_POST['reject']));
        $map['id'] = $id;
        $data['do_status'] = 1;
        $data['do_user_id'] = $this->mid;
        $data['do_reject_reason'] = $do_reject_reason;
        $data['do_timeline'] = time();
        $status = $this->userCreditModel->saveComplain($map, $data);
        if ($status === false) {
            echo json_encode($this->ajaxReturn);
            die;
        }
        $this->ajaxReturn['status'] = 2;
        $this->ajaxReturn['info'] = '操作成功';
        echo json_encode($this->ajaxReturn);
        die;
    }

    /**
     * 拒绝处理
     */
    public function reject() {
        $id = intval($_GET['id']);
        $this->assign('id', $id);
        $this->display();
    }

    /**
     * 回复拒绝处理
     */
    public function doReject() {
        $id = intval($_POST['id']);
        $do_reject_reason = strip_tags(t($_POST['reject']));
        $map['id'] = $id;
        $data['do_status'] = 2;
        $data['do_user_id'] = $this->mid;
        $data['do_reject_reason'] = $do_reject_reason;
        $data['do_timeline'] = time();
        $status = $this->userCreditModel->saveComplain($map, $data);
        if ($status === false) {
            echo json_encode($this->ajaxReturn);
            die;
        }
        $this->ajaxReturn['status'] = 2;
        $this->ajaxReturn['info'] = '操作成功';
        echo json_encode($this->ajaxReturn);
        die;
    }

}
