package cn.tycoding.admin.dto;

/**
 * @auther TyCoding
 * @date 2018/10/16
 */
public class Result {

    private Integer code; //返回码
    private Object data; //返回数据

    public Result() {
    }

    public Result(Integer code, Object data) {
        this.code = code;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
